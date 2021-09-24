const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query Projects {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach(node => {
    actions.createPage({
      // Path for this page — required
      path: `/projects/${node.frontmatter.slug}`,
      component: path.resolve('src/templates/project-details.js'),
      context: {
        // Add optional context data to be inserted
        // as props into the page component.
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
        slug: node.frontmatter.slug
      },
    })
  })
}
