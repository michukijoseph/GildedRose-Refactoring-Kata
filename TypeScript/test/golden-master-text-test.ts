import { Item, GildedRose, ItemName } from '../app/gilded-rose';

const items = [
  new Item(ItemName.dexterity, 10, 20), //
  new Item(ItemName.agedBrie, 2, 0), //
  new Item(ItemName.elixir, 5, 7), //
  new Item(ItemName.sulfuras, 0, 80), //
  new Item(ItemName.sulfuras, -1, 80),
  new Item(ItemName.backaStage, 15, 20),
  new Item(ItemName.backaStage, 10, 49),
  new Item(ItemName.backaStage, 5, 49),
  // this conjured item does not work properly yet
  new Item(ItemName.conjured, 3, 6)];


const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);

  });
  console.log();
  gildedRose.updateQuality();
}
