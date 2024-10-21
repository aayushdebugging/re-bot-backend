import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryDto, InventoryFilterDto } from './inventory.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Only agencies can create new inventory records
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('AGENCY')
  async createInventory(@Body() inventoryDto: InventoryDto) {
    return this.inventoryService.createInventory(inventoryDto);
  }

  // Get all inventories based on filters
  @Get()
  async getFilteredInventories(@Query() filters: InventoryFilterDto) {
    return this.inventoryService.getFilteredInventories(filters);
  }

  // Get inventory details by ID
  @Get(':id')
  async getInventoryById(@Param('id') id: string) {
    return this.inventoryService.getInventoryById(id);
  }

  // Update an existing inventory record by ID
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('AGENCY')
  async updateInventory(@Param('id') id: string, @Body() inventoryDto: InventoryDto) {
    return this.inventoryService.updateInventory(id, inventoryDto);
  }

  // Delete an inventory record by ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('AGENCY')
  async deleteInventory(@Param('id') id: string) {
    return this.inventoryService.deleteInventory(id);
  }
}
