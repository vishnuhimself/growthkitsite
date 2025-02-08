'use server'

import { addDynamicPage } from '@/app/sitemap'
import { isValidHeight, isValidWeight } from './height-weight-config'

export async function trackDynamicPage(height: string, weight: number) {
  // Only track valid combinations that aren't in our static set
  if (isValidHeight(height) && isValidWeight(height, weight)) {
    const slug = `${height}-${weight}-lbs`
    addDynamicPage(slug)
  }
} 