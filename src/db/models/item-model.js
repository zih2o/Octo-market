import { model } from 'mongoose';
import { itemSchema } from '../schemas/item-schema.js';
import { createVirtualId } from '..';

createVirtualId(itemSchema);
const Item = model('items', itemSchema);

export class ItemsModel {
  async findByName(name) {
    const item = await Item.findOne({ name });
    return item;
  }

  async findById(itemId) {
    const item = await Item.findOne({ _id: itemId });
    return item;
  }

  async createItem(ItemInfo) {
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