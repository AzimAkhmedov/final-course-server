import Comments from "../models/Comments";

class ItemController {
  async getComments(req, res) {
    try {
      const { username, collectionName, itemId } = req.params;
      const comments = await Comments.findOne(username, collectionName, itemId);

      return res.json(comments);
    } catch (error) {
      return res.status(400).json({ message: "Error" });
    }
  }
  async getLikes(req, res) {}
  async PressLike(req, res) {}
  async WriteComment(req, res) {
    try {
         const {} = req.body
         const comment = new Comments()
    } catch (error) {
        
    }
  }
}
