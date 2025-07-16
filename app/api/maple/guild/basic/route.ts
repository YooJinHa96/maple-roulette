import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
//query guildId : string
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const guildId = searchParams.get("guildId");

  try {
    const response = await axios.get(
      `${process.env.NEXON_API_URL}/maplestory/v1/guild/basic`,
      {
        headers: {
          accept: "application/json",
          "x-nxopen-api-key": process.env.NEXON_API_KEY,
        },
        params: {
          oguild_id: guildId,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching guild basic:", error);
    return NextResponse.json(
      { error: "Failed to fetch guild basic" },
      { status: 500 }
    );
  }
}
