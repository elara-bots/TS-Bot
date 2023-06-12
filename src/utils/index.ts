import {
    MessagePayload,
    MessageCreateOptions,
    InteractionEditReplyOptions,
    EmbedBuilder,
    ChatInputCommandInteraction,
    InteractionReplyOptions,
    InteractionResponse,
    InteractionDeferReplyOptions,
    Message,
} from "discord.js";

type TextBasedChannelSendOption =
    | string
    | MessagePayload
    | MessageCreateOptions;

type CommonInteractionEditReplyOptions =
    | string
    | MessagePayload
    | InteractionEditReplyOptions;

export function embed(): EmbedBuilder {
    return new EmbedBuilder().setColor(0xff0092).setTimestamp();
}

export function getResponder(interaction: ChatInputCommandInteraction) {
    return {
        reply: async (
            options: InteractionReplyOptions
        ): Promise<void | InteractionResponse> => {
            return await interaction.reply(options).catch(log);
        },
        defer: async (
            options?: InteractionDeferReplyOptions
        ): Promise<void | InteractionResponse> => {
            return await interaction.deferReply(options).catch(log);
        },

        edit: async (
            options: CommonInteractionEditReplyOptions
        ): Promise<void | Message> => {
            return await interaction.editReply(options).catch(log);
        },
        send: async (
            options: TextBasedChannelSendOption
        ): Promise<void | Message> => {
            if (!interaction.channel || !interaction.channel.isTextBased()) {
                return;
            }
            return await interaction.channel.send(options).catch(log);
        },
    };
}

export type getResponders = {
    send: (options: TextBasedChannelSendOption) => Promise<void | Message>;
    edit: (
        options: CommonInteractionEditReplyOptions
    ) => Promise<void | Message>;
    defer: (
        options?: InteractionDeferReplyOptions
    ) => Promise<void | InteractionResponse>;
    reply: (
        options: InteractionReplyOptions
    ) => Promise<void | InteractionResponse>;
};

function log(e: unknown) {
    console.warn(e);
}
