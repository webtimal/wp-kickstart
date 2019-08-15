exports.build = (cmd, args = {}) =>
{
    for(let [key, value] of Object.entries(args))
    {
        cmd += ` --${key}="${value}"`;
    }

    return cmd
}
