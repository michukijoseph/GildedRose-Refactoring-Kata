export enum ItemName {
  agedBrie = 'Aged Brie',
  backaStage = 'Backstage passes to a TAFKAL80ETC concert',
  sulfuras = 'Sulfuras, Hand of Ragnaros',
  conjured = 'Conjured Mana Cake',
  elixir = 'Elixir of the Mongoose',
  dexterity = '+5 Dexterity Vest'
}

export class Item {
  name: ItemName;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateItemQuality(this.items[i]);
    }

    return this.items;
  }

  private updateItemQuality(item: Item) {
    switch (item.name) {
      case ItemName.agedBrie:
        this.updateAgedBrieQuality(item);
        break;
      case ItemName.backaStage:
        this.updateBackstagePassesQuality(item);
        break;
      case ItemName.sulfuras:
        // Sulfuras never changes, no need to do anything.
        break;
      case ItemName.conjured:
        this.updateConjuredItemQuality(item);
        break;
      default:
        this.updateRegularItemQuality(item);
    }

    // Decrease sellIn for all items except Sulfuras.
    if (item.name !== ItemName.sulfuras) {
      item.sellIn--;
    }

    // Handle the quality for items that have passed their sell-by date.
    if (item.sellIn < 0) {
      this.handleExpiredItem(item);
    }
  }

  private updateAgedBrieQuality(item: Item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  private updateBackstagePassesQuality(item: Item) {
    if (item.quality < 50) {
      item.quality++;
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality++;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality++;
      }
    }
  }

  private updateConjuredItemQuality(item: Item) {
    if (item.quality > 0) {
      item.quality -= 2;
    }
  }

  private updateRegularItemQuality(item: Item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  private handleExpiredItem(item: Item) {
    switch (item.name) {
      case ItemName.agedBrie:
        this.updateAgedBrieQuality(item);
        break;
      case ItemName.backaStage:
        item.quality = 0;
        break;
      case ItemName.conjured:
        this.updateConjuredItemQuality(item);
        break;
      default:
        this.updateRegularItemQuality(item);
    }
  }
}

