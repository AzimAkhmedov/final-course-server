import Collection from "../models/Collection.js";
import Item from "../models/Item.js";
import Comments from "../models/Comments.js";

class SearchController {
  async search(req, res) {
    const { searchparam } = req.params;
    const items = await Item.find();
    const collection = await Collection.find();
    const comment = await Comments.find();
    const resultItemNames = items.filter((e) =>
      e.itemName.includes(searchparam)
    );
    let resultItemParams = [];
    items.forEach((e) => {
      let flag = false;
      Object.keys(e.params).forEach((key) => {
        if (String(e.params[key]).includes(searchparam)) {
          flag = true;
        }
      });
      if (flag) {
        resultItemParams.push(e);
      }
    });
    const resultCollectionNames = collection.filter((e) =>
      e.collectionName.includes(searchparam)
    );
    const resultCommentMessages = comment.filter((e) =>
      e.comment.includes(searchparam)
    );
    return res.json({
      resultItemNames,
      resultItemParams,
      resultCollectionNames,
      resultCommentMessages,
    });
  }
}

export default new SearchController();
