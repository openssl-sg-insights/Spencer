import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
	if (!args.length)
		return message.channel.send(
			client.embed(
				{
					description:
						"Please specify how many messages you'd like to purge, 1-100!",
				},
				message
			)
		);
	if (
		isNaN(parseInt(args[0], 10)) ||
		parseInt(args[0], 10) < 0 ||
		parseInt(args[0], 10) > 100
	)
		return message.channel.send(
			client.embed(
				{
					description:
						'Please provide a valid number & a number that is between 1-100!',
				},
				message
			)
		);
	await message.delete();
	await (message.channel as TextChannel).bulkDelete(parseInt(args[0], 10));
};
export const name: string = 'purge';
export const category: string = 'moderation';
export const userPermissions: string = 'MANAGE_MESSAGES';
export const description: string = 'Bulk delete a specific amount of messages';
