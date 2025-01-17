import type { MetadataStandard, Files, RoyaltiesStandard } from '@mesh/core';
export declare type AssetMetadata = FungibleAssetMetadata | NonFungibleAssetMetadata | RoyaltiesStandard;
export declare type FungibleAssetMetadata = MetadataStandard & {
    ticker: string;
    decimals: number;
    version: `${number}.${number}`;
};
export declare type NonFungibleAssetMetadata = AudioAssetMetadata | ImageAssetMetadata | SmartAssetMetadata | VideoAssetMetadata;
declare type AudioAssetMetadata = MetadataStandard & Files;
export declare type ImageAssetMetadata = MetadataStandard & Files & {
    artists?: [
        {
            name: string;
            twitter?: `https://twitter.com/${string}`;
        }
    ];
    attributes?: {
        [key: string]: string;
    };
    traits?: string[];
};
declare type SmartAssetMetadata = MetadataStandard & Files;
declare type VideoAssetMetadata = MetadataStandard & Files;
export {};
