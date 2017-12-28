export default () => cli => {
  cli.on('parsed', (command, input, flags) => {
    if (!command) return

    const missingRequiredOptions = command.options.options.filter(option => {
      const isRequired = option.required
      const isMissing = typeof flags[option.name] === 'undefined'
      return isMissing && isRequired
    })
    if (missingRequiredOptions.length > 0) {
      console.log(
        `Missing options: ${missingRequiredOptions
          .map(option => option.name)
          .join(', ')}`
      )
      process.exit(1) // eslint-disable-line unicorn/no-process-exit
    }
  })
}
