import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

interface Props {
  type: string
}

const Home: NextPage<Props> = ({ type }) => {
  const router = useRouter()
  const message = useMemo(() => {
    if (router.query.alt === '1') {
      return 'ブランチ'
    }
    return ''
  }, [router.query.alt])
  return (
    <div>
      <Head>
        <title>タイトル</title>
      </Head>

      <main>
        <p data-testid='type'>{type}</p>
        <p data-testid='message'>{message}</p>
      </main>
    </div>
  )
}
export default Home

export const getStaticProps: GetStaticProps<Props> = async ({ }) => {
  return {
    props: {
      type: 'Static',
    }
  }
}
