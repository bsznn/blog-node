import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "User", 
		},
		title: {
			type: String,
			required: true,
		},
		content: {
          type: String,
          required: true,
        },
		description: {
			type: String,
			required: true,
			maxlength: 250,
		},
		category: {
			type: [String],
			default: ["Politique"],
		},
		image: {
			src: String,
			alt: String,
		},
	},
	{ timestamps: true },
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
