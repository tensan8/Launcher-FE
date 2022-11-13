import DiscordWebhook from 'discord-webhook-ts';

// Pass in your Discord webhook URL.
const discordClient = new DiscordWebhook('https://discord.com/api/webhooks/1041017207863382098/6b1QNGyQa_VH91U5KZH15j67pzEZf89WPET5llbHh0oIZJe2hgI5fyU_kreVcWuYDORt');

discordClient.execute({
    embeds: [
        {
            title: 'Some title',
            description: 'Some description',
        },
        {
            fields: [
                {
                    name: 'Some field',
                    value: 'Some field value',
                }
            ]
        }
    ]
}).then((response) => {
    console.log('Successfully sent webhook.')
})

