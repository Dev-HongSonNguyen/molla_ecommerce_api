import productModel from "../model/productModel";
export const search = async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ error: "Missing search term" });
  }
  try {
    const results = await productModel.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error searching products" });
  }
};
