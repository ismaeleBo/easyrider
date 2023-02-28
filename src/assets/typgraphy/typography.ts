export enum FontSize {
  SMALL = 16,
  MEDIUM = 22,
  LARGE = 32,
}

export enum FontWeight {
  NORMAL = 'normal',
  BOLD = 'bold',
  MEDIUM = '500',
  SEMIBOLD = '600',
}

export type FontWeightType = (typeof FontWeight)[keyof typeof FontWeight];

export const FontFamily = {
  DOSIS_REGULAR: 'Dosis-Regular',
  DOSIS_MEDIUM: 'Dosis-Medium',
  DOSIS_SEMIBOLD: 'Dosis-SemiBold',
  DOSIS_BOLD: 'Dosis-Bold',
} as const;

export type FontFamilyType = (typeof FontFamily)[keyof typeof FontFamily];
