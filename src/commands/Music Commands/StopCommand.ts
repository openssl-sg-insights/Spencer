import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message) => {
	if (!client.utils.checkVC(message)) {
		return message.channel.send(
			client.embed(
				{
					description:
						'You have to be in a voice channel and be in the same voice channel as me!',
				},
				message
			)
		);
	}
	const dispatch = client.music.dispatchers.get(message.guild.id);
	if (!dispatch)
		return message.channel.send(
			client.embed({ description: 'I am not playing music!' }, message)
		);
	if (!message.guild.me.voice?.channel)
		return message.channel.send(
			client.embed({ description: 'I need to be in a VC as well!' }, message)
		);
	if (
		message.guild.me.voice.channel.members.size == 2 &&
		message.guild.me.voice.channel.members.has(message.author.id)
	) {
		dispatch.queue.clear();
		await dispatch.player.stopTrack();
		return message.channel.send(
			client.embed({ description: 'Cleared the queue!' }, message)
		);
	} else {
		if (!message.member.permissions.has('MANAGE_GUILD'))
			return message.channel.send(
				client.embed(
					{
						description:
							'You need MANAGE_GUILD to clear the queue as there are other people in the VC.',
					},
					message
				)
			);
		dispatch.queue.clear();
		await dispatch.player.stopTrack();
		return message.channel.send(
			client.embed({ description: 'Cleared the queue!' }, message)
		);
	}
};
export const name: string = 'stop';
export const category: string = 'music';
export const description: string = 'Stop the music';
export const aliases: string[] = ['disconnect', 'leave'];