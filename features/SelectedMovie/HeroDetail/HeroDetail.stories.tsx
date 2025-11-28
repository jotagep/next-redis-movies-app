import React from 'react'

import HeroDetail from './index'

import { mockMovieInfo } from '@/mocks/movies'

export default {
  title: 'Features/SelectedMovie/HeroDetail',
  component: HeroDetail,
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default = {
  args: {
    movie: mockMovieInfo
  }
}

export const WithoutCast = {
  args: {
    movie: {
      ...mockMovieInfo,
      cast: []
    }
  }
}

export const WithFewerCast = {
  args: {
    movie: {
      ...mockMovieInfo,
      cast: mockMovieInfo.cast.slice(0, 3)
    }
  }
}

export const SingleGenre = {
  args: {
    movie: {
      ...mockMovieInfo,
      genres: [{ id: 18, name: 'Drama' }]
    }
  }
}

export const LongOverview = {
  args: {
    movie: {
      ...mockMovieInfo,
      overview: mockMovieInfo.overview + ' ' + mockMovieInfo.overview + ' ' + mockMovieInfo.overview
    }
  }
}
