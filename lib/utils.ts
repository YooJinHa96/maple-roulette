import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type GuildData = {
  character_name: string;
  character_class: string;
  character_level: number;
  character_image: string;
  accessFlag: boolean;
  liberationQuestClearFlag: boolean;
  mainCharacter: string;
  mainCharacterGuild: string | null;
  missingSkills: Record<string, boolean>;
};

export async function getGuildData() {
  const response = await fetch("/guild.json");
  try {
    const data = await response.json();
    const filterData = data.filter(
      (item: GuildData) =>
        item.accessFlag && item.mainCharacter === item.character_name
    );
    return filterData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
