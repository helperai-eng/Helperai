import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contentId, fileUrl, difficultyLevel } = await req.json();

    if (!contentId || !fileUrl || !difficultyLevel) {
      return new Response(
        JSON.stringify({ error: "Content ID, file URL, and difficulty level are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Mock processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock processing results (in a real app, you'd process the PowerPoint here)
    const mockResults = {
      videoUrl: "https://example.com/video.mp4", // This would be a real video URL
      quiz: {
        questions: [
          {
            id: 1,
            type: "multiple",
            question: "What is the main topic covered in the presentation?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 0,
          },
          {
            id: 2,
            type: "multiple",
            question: "Which concept was discussed in detail?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 1,
          },
        ],
      },
    };

    // Update content record with processing results
    const { error: updateError } = await supabaseClient
      .from("content")
      .update({
        status: "ready",
        video_url: mockResults.videoUrl,
        quiz_data: mockResults.quiz,
      })
      .eq("id", contentId);

    if (updateError) {
      throw new Error(`Failed to update content: ${updateError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, data: mockResults }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});