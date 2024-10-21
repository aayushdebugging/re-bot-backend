import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './inventory.schema';
import { InventoryDto, InventoryFilterDto } from './inventory.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private readonly inventoryModel: Model<Inventory>,
    private readonly configService: ConfigService,  // Access to environment variables
  ) {}

  // Create a new inventory record
  async createInventory(data: InventoryDto): Promise<Inventory> {
    const newInventory = new this.inventoryModel(data);
    return newInventory.save();
  }

  // Get all inventories based on filters
  async getFilteredInventories(filters: InventoryFilterDto): Promise<Inventory[]> {
    const query: any = {};

    // Build query based on filters
    if (filters.type) query.type = filters.type;
    if (filters.subType) query.subType = filters.subType;
    if (filters.locality) query['address.locality'] = { $regex: filters.locality, $options: 'i' };
    if (filters.saleType) query.saleType = filters.saleType;
    if (filters.bhk) query['dimension.bhk'] = filters.bhk;
    if (filters.minPrice && filters.maxPrice) {
      query['paymentPlan.totalAmountBuy'] = {
        $gte: Number(filters.minPrice),
        $lte: Number(filters.maxPrice),
      };
    }

    return this.inventoryModel
      .find(query)
      .populate('address')
      .populate('paymentPlan')
      .populate('dimension')
      .populate('project')
      .exec();
  }

  // Get an inventory record by ID
  async getInventoryById(id: string): Promise<Inventory> {
    const inventory = await this.inventoryModel
      .findById(id)
      .populate('address')
      .populate('paymentPlan')
      .populate('dimension')
      .populate('project')
      .exec();

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return inventory;
  }

  // Update an existing inventory record by ID
  async updateInventory(id: string, data: InventoryDto): Promise<Inventory> {
    const updatedInventory = await this.inventoryModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!updatedInventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return updatedInventory;
  }

  // Delete an inventory record by ID
  async deleteInventory(id: string): Promise<Inventory> {
    const deletedInventory = await this.inventoryModel.findByIdAndDelete(id).exec();

    if (!deletedInventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return deletedInventory;
  }

  // Helper method to get the MongoDB URI from environment variables (for demonstration)
  getDatabaseURI(): string {
    return this.configService.get<string>('MONGODB_URI');
  }
}
