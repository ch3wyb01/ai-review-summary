import { generateText } from "ai";
import { Product } from "./types";

export const summariseReviews = async (product: Product) => {
  const prompt = `Summarise the following customer reviews for the ${product.name} product:

    ${product.reviews.map((review) => review.review).join("\n\n")}

    Provide a concise summary of the main themes and sentiments in 2-3 sentences.`;

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4.5",
      prompt,
    });

    return text;
  } catch (err) {
    console.error("Failed to generate summary:", err);
    throw new Error("Unable to generate review summary. Please try again.");
  }
};
