import React, { Component } from "react"
// import PropTypes from "prop-types"
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


class CategoryTemplate extends Component {
  render() {
    const data = this.props.data

    return (
      <Layout>
        <hr />
        <h1>Posts in {data.wordpressCategory.name}</h1>
          <p>Categories:
            <ul style={{ display: `flex`, flexWrap: `wrap`,justifyContent: `space-around`, }}>
            {data.allWordpressCategory.edges.map(({ node }) => (
              <li
                key={node.id}
                style={{
                  listStyle: `none`,
                  padding: `1rem`,
                }}
              >
                <Link to={`categories/${node.slug}`}>{node.name}</Link>
              </li>
            ))}

            </ul>
          </p>
        <CategorySection>
          {data.allWordpressPost.edges.map(({ node }) => (
            <CategoryPost key={node.slug}>
              <Link to={`blog/${node.slug}`}>
                {node.jetpack_featured_media_url &&
                  <img src={node.jetpack_featured_media_url} alt={node.title}/>
                }
                <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </Link>
              <p>{node.date}</p>

            </CategoryPost>
          ))}
        </CategorySection>

      </Layout>
    )
  }
}

export default CategoryTemplate

export const categoryQuery = graphql`
  query currentCategoryQuery($slug: String!) {

    wordpressCategory(slug: {eq: $slug}) {
      count
      name
      link
    }

    allWordpressCategory(filter: {count: {gt: 0}}) {
      edges {
        node {
          slug
          name
          id
        }
      }
    }

    allWordpressPost(filter: {categories: {elemMatch: {slug: {eq: $slug}}}}) {
      edges {
        node {
          title
          content
          excerpt
          slug
          jetpack_featured_media_url
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
