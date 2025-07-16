import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
//query guild-name : string , world-name : string
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const guildName = searchParams.get("guildName");
  const worldName = searchParams.get("worldName");

  try {
    const response = await axios.get(
      `${process.env.NEXON_API_URL}/maplestory/v1/guild/id`,
      {
        headers: {
          accept: "application/json",
          "x-nxopen-api-key": process.env.NEXON_API_KEY,
        },
        params: {
          world_name: worldName,
          guild_name: guildName,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching guild ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch guild ID" },
      { status: 500 }
    );
  }
}
