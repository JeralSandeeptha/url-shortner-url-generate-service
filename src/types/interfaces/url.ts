import { Document } from "mongoose";

export interface IUrl extends Document {
  url_id: string;
  long_url: string;
  short_url: string;
  userId: string;
  clicks: number;
  campaignId?: string;
  tags: string[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}