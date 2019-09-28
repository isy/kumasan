const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      categories: allMarkdownRemark {
        group(field: frontmatter___category, limit: 1) {
          nodes {
            frontmatter {
              category
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.tsx'),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  result.data.categories.group.forEach(({ nodes }) => {
    const [node] = nodes
    const { frontmatter: { category } } = node
    createPage({
      path: `/categories/${category}`,
      component: path.resolve('./src/templates/category.tsx'),
      context: {
        category,
      },
    })
  })
}

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         '@': resolve(__dirname, 'src'),
//         '@utils': resolve(__dirname, 'src/utils'),
//         '@components': resolve(__dirname, 'src/components'),
//       },
//     },
//   })
// }
