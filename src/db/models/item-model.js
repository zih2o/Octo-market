import { model } from 'mongoose';
import { itemSchema } from '../schemas/item-schema.js';
import { createVirtualId } from '..';

createVirtualId(itemSchema);
const Item = model('items', itemSchema);

export class ItemsModel {
  async findAll() {
    const items = await Item.find({}).sort({ createdAt: -1 });
    return items;
  }

  async findByName(name) {
    const item = await Item.findOne({ name });
    return item;
  }

  async findByCategory(catId) {
    const items = await Item.find({ category: catId }).sort({
      createdAt: -1,
    });
    return items;
  }

  async findById(itemId) {
    const item = await Item.findOne({ _id: itemId });
    return item;
  }

  async create(ItemInfo) {
    const createdNewItem = await new Item(ItemInfo).save();
    return createdNewItem;
  }

  async update({ itemId, update }) {
    const option = { returnOriginal: false };
    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId },
      update,
      option,
    );
    return updatedItem;
  }

  async remove(itemId) {
    return await Item.findByIdAndDelete(itemId);
  }
}

const itemsModel = new ItemsModel();

export { itemsModel };
