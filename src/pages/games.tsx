import GamesTemplate, { GamesTemplateProps } from 'pages/templates/Games'
import { GetServerSidePropsContext } from 'next'
import { initializeApollo } from 'utils/apollo'
import { parseQueryStringToWhere } from 'utils/filter'
import { QUERY_GAMES } from 'graphql/queries/games'
import { QueryGameBySlugQueryVariables, QueryGamesQuery } from 'graphql/generated/graphql'

export default function GamesPage(props: GamesTemplateProps) {
  return <GamesTemplate {...props} />
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const apolloClient = initializeApollo()

  const filterPrice = {
    title: 'Price',
    name: "price",
    type: 'radio',
    fields: [
      { label: 'Free', name: 0 },
      { label: 'Under $50', name: 50 },
      { label: 'Under $100', name: 100 },
      { label: 'Under $150', name: 150 },
      { label: 'Under $250', name: 250 },
      { label: 'Under $500', name: 500 }
    ]
  }

  const filterPlatforms = {
    title: 'Platforms',
    name: 'platforms',
    type: 'checkbox',
    fields: [
      { label: 'Windows', name: "windows" },
      { label: 'Linux', name: 'linux' },
      { label: 'Mac OS', name: 'mac' }
    ]
  }

  const filterSort = {
    title: 'Sort by price',
    name: 'sort',
    type: 'radio',
    fields: [
      { label: 'Lowest to highest', name: 'price:asc' },
      { label: 'Highest to lowest', name: 'price:desc' }
    ]
  }

  const filterCategories = {
    title: 'Genres',
    name: 'categories',
    type: 'checkbox',
    fields: [
      { label: 'Action', name: 'Action' },
      { label: 'Adventure', name: 'Adventure' },
      { label: 'Sports', name: 'Sports' },
      { label: 'Puzzle', name: 'Puzzle' },
      { label: 'Horror', name: 'Horror' },
      { label: 'Platformer', name: 'Platformer' },
      { label: 'Fantasy', name: 'Fantasy' },
      { label: 'RPG', name: 'Role-playing' },
      { label: 'JRPG', name: 'JRPG' },
      { label: 'Simulation', name: 'Simulation' },
      { label: 'Strategy', name: 'Strategy' },
      { label: 'Shooter', name: 'Shooter' }
    ]
  }

  const filterItems = [
    filterSort,
    filterPrice,
    filterPlatforms,
    filterCategories
  ]

  await apolloClient.query<QueryGamesQuery, QueryGameBySlugQueryVariables>({
    query: QUERY_GAMES,
    variables: {
      limit: 15,
      where: parseQueryStringToWhere({ queryString: query, filterItems }),
      sort: query.sort as string | null
    }
  })

  return {
    props: {
      initialApoloState: apolloClient.cache.extract(),
      filterItems
    }
  }
}
