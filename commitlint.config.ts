import { AsyncRule, UserConfig } from '@commitlint/types'

const linkJiraIssues: AsyncRule<string[]> = async ({ subject }, when, value) => {
  if (when === 'never') return [true, '']
  if (!subject) return [false, 'subject is required']
  if (value === undefined) value = []
  if (!Array.isArray(value)) return [false, 'value must be an array of keys']
  const keyPattern = value.length ? value.join('|') : '[A-Z][A-Z]+'
  const issueRegex = new RegExp(`(${keyPattern}-\\d{1,5})`, 'g')
  if (!issueRegex.test(subject)) {
    let message = `subject must contain a Jira issue`
    if (value.length > 1) message += ` using the key ${value.slice(0, -1).join(', ')} or ${value.slice(-1)[0]}`
    if (value.length === 1) message += ` using the key ${value[0]}`
    return [false, message]
  }
  return [true]
}

const commitlintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit): boolean => /build\(deps(-dev)?\)/.test(commit)],
  defaultIgnores: true,
  plugins: [
    {
      rules: {
        'link-jira-issues': linkJiraIssues,
      },
    },
  ],
  rules: {
    'link-jira-issues': [2, 'always', ['WWW']],
  },
}

export default commitlintConfig
