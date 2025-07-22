import { useRouter } from 'next/router'

import SelectedMoviePage from '@/features/SelectedMovie/SelectedMoviePage'

export default function Movies() {
  const id = useRouter().query.id
  return <SelectedMoviePage id={id as string} />
}
