import React, { Component } from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import styled from 'styled-components'

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CategoryPost = styled.article`
  position: relative;
  background: #333;
  margin-bottom: 2rem;

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    max-height: 400px;
    margin: 0;
  }

  h3, p {
    color: #eee;
    padding: 1rem;
  }

  &:hover {
    background: #444;
  }
`;


class Categories extends Component {
  render() {
    const data = this.props.data

    return (
      <Layout>
        <hr />
        <h1>Categories</h1>

        <CategorySection>
          {data.allWordpressCategory.edges.map(({ node }) => (
            <Link to={`categories/${node.slug}`}>
              <CategoryPost key={node.slug}>
                <h3 dangerouslySetInnerHTML={{ __html: node.name }} />
              </CategoryPost>
            </Link>
          ))}
        </CategorySection>

      </Layout>
    )
  }
}

export default Categories

// Set here the ID of the home page.
export const blogQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
          jetpack_featured_media_url
          date(formatString: "MMMM DD, YYYY")
          categories {
            name
            slug
          }
        }
      }
    }

    allWordpressCategory(filter: {count: {gt: 0}}) {
      edges {
        node {
          slug
          name
        }
      }
    }
  }
`
