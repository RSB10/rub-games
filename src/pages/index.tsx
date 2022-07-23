import Home, { HomeTemplateProps } from './templates/Home'
import { initializeApollo } from 'utils/apollo'
import { QueryHomeQuery } from 'graphql/generated/graphql'
import { QUERY_HOME } from 'graphql/queries/home'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// ATENÇÃO:
// os métodos getStaticProps/getServerSideProps SÓ FUNCIONAM EM PAGES
// getStaticProps => gerar estático em build time (gatsby)
// getServerSideProps => gerar via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gerar via ssr a cada request (vai para o client, faz hydrate do lado do client depois do 1 req)
export async function getStaticProps() {
  const apolloClient = initializeApollo()

  const { data: { banners, newGames, upcomingGames, freeGames, sections } } = await apolloClient.query<QueryHomeQuery>({
    query: QUERY_HOME
  })

  return {
    props: {
      revalidade: 60,
      banners: banners?.data.map((banner) => ({
        img: `http://localhost:1337${banner.attributes?.image.data?.attributes?.url}`,
        title: banner.attributes?.title,
        subtitle: banner.attributes?.subtitle,
        buttonLabel: banner.attributes?.button?.label,
        buttonLink: banner.attributes?.button?.link,
        ...(banner.attributes?.ribbon && {
          ribbon: banner.attributes?.ribbon?.text,
          ribbonColor: banner.attributes?.ribbon?.color,
          ribbonSize: banner.attributes?.ribbon?.size
        })
      })),
      newGamesTitle: sections?.data?.attributes?.newGames?.title,
      newGames: newGames?.data.map((game) => ({
        tiitle: game.attributes?.name,
        slug: game.attributes?.slug,
        developer: game.attributes?.developers?.data[0].attributes?.name,
        img: `http://localhost:1337${game.attributes?.cover.data?.attributes?.url}`,
        price: game.attributes?.price
      })),
      mostPopularGamesTitle: sections?.data?.attributes?.popularGames?.title,
      mostPopularHighlight: {
        title: sections?.data?.attributes?.popularGames?.highlight?.title,
        subtitle: sections?.data?.attributes?.popularGames?.highlight?.subtitle,
        backgroundImage: `http://localhost:1337${sections?.data?.attributes?.popularGames?.highlight?.background.data?.attributes?.url}`,
        floatImage: `http://localhost:1337${sections?.data?.attributes?.popularGames?.highlight?.floatimage?.data?.attributes?.url}` ,
        buttonLabel: sections?.data?.attributes?.popularGames?.highlight?.buttonLabel,
        buttonLink: sections?.data?.attributes?.popularGames?.highlight?.buttonLink,
        alignment: sections?.data?.attributes?.popularGames?.highlight?.alignment
      },
      mostPopularGames: sections!.data!.attributes!.popularGames!.games!.data.map((game) => ({
        title: game.attributes?.name,
        slug: game.attributes?.slug,
        developer: game.attributes?.developers?.data[0].attributes?.name,
        img: `http://localhost:1337${game.attributes?.cover.data?.attributes?.url}`,
        price: game.attributes?.price
      })),
      upcomingGamesTitle: sections?.data?.attributes?.upcomingGames?.title,
      upcomingGames: upcomingGames?.data.map((game) => ({
        title: game.attributes?.name,
        slug: game.attributes?.slug,
        developer: game.attributes?.developers?.data[0].attributes?.name,
        img: `http://localhost:1337${game.attributes?.cover.data?.attributes?.url}`,
        price: game.attributes?.price
      })),
      freeGamesTitle: sections?.data?.attributes?.freeGames?.title,
      upcomingHighlight: {
        title: sections?.data?.attributes?.upcomingGames?.highlight?.title,
        subtitle: sections?.data?.attributes?.upcomingGames?.highlight?.subtitle,
        backgroundImage: `http://localhost:1337${sections?.data?.attributes?.upcomingGames?.highlight?.background.data?.attributes?.url}`,
        floatImage: `http://localhost:1337${sections?.data?.attributes?.upcomingGames?.highlight?.floatimage?.data?.attributes?.url}` ,
        buttonLabel: sections?.data?.attributes?.upcomingGames?.highlight?.buttonLabel,
        buttonLink: sections?.data?.attributes?.upcomingGames?.highlight?.buttonLink,
        alignment: sections?.data?.attributes?.upcomingGames?.highlight?.alignment
      },
      freeGames: freeGames?.data.map((game) => ({
        title: game.attributes?.name,
        slug: game.attributes?.slug,
        developer: game.attributes?.developers?.data[0].attributes?.name,
        img: `http://localhost:1337${game.attributes?.cover.data?.attributes?.url}`,
        price: game.attributes?.price
      })),
      freeHighlight: {
        title: sections?.data?.attributes?.freeGames?.highlight?.title,
        subtitle: sections?.data?.attributes?.freeGames?.highlight?.subtitle,
        backgroundImage: `http://localhost:1337${sections?.data?.attributes?.freeGames?.highlight?.background.data?.attributes?.url}`,
        floatImage: `http://localhost:1337${sections?.data?.attributes?.freeGames?.highlight?.floatimage?.data?.attributes?.url}` ,
        buttonLabel: sections?.data?.attributes?.freeGames?.highlight?.buttonLabel,
        buttonLink: sections?.data?.attributes?.freeGames?.highlight?.buttonLink,
        alignment: sections?.data?.attributes?.freeGames?.highlight?.alignment
      }
    }
  }
}
