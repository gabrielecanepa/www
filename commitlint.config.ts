import {
  type AnyRuleConfig,
  type AsyncRule,
  type Rule,
  type RuleConfigQuality,
  type SyncRule,
  type UserConfig,
} from '@commitlint/types'
import { config } from 'dotenv'

config()

const JIRA_PROJECT = process.env.JIRA_PROJECT
const isCI = process.env.CI === 'true'
const skipJira = /^(true|1)$/.test(process.env.SKIP_JIRA ?? '')

/**
 * Log a warning message
 */
const logWarn = (...args: any[]): void => console.warn('\x1b[43m\x1b[30m', 'WARN', '\x1b[0m', ...args)

/**
 * Ignore rule to skip Dependabot commits
 */
const ignoreDependabot = (commit: string): boolean => /build\(deps(-dev)?\)/.test(commit)

/**
 * Rule to enforce linking Jira issues in the commit subject
 */
const linkJiraIssues: Rule<string> = ({ subject }, when, value) => {
  if (!value || !/[A-Z][A-Z]+/.test(value)) return [false, 'invalid jira project key']

  const issueRegex = new RegExp(`[(\\s]${value}-\\d{1,5}[(\\s]?`, 'g')

  if (when === 'never' || !subject || issueRegex.test(subject)) return [true]

  if (skipJira || isCI) {
    logWarn('The commit subject does not contain any valid Jira issues')
    return [true]
  }
  return [false, `subject must contain at least one jira issue of project ${value}`]
}

/**
 * Custom commitlint rules
 */
type CustomRules = Record<string, { plugin: Rule | AsyncRule | SyncRule, config: AnyRuleConfig<RuleConfigQuality.User> }>

const customRules: CustomRules = {
  'link-jira-issues': {
    plugin: linkJiraIssues,
    config: [2, 'always', JIRA_PROJECT],
  },
}

const customRulesPlugin = { rules: Object.keys(customRules).reduce((a, k) => ({ ...a, [k]: customRules[k].plugin }), {}) }
const customRulesConfig = Object.keys(customRules).reduce((a, k) => ({ ...a, [k]: customRules[k].config }), {})

const commitlintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [ignoreDependabot],
  defaultIgnores: true,
  plugins: [customRulesPlugin],
  rules: {
    ...customRulesConfig,
    // ...other rules
  },
}

export default commitlintConfig
