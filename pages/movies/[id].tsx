import SelectedMoviePage from '@/features/SelectedMovie/SelectedMoviePage'
import { useRouter } from 'next/router'

export default function Movies() {
  const id = useRouter().query.id
  return <SelectedMoviePage id={id as string} />
}
