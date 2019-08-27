import React from 'react'
import { graphql } from 'gatsby'
import { Card } from 'react-bootstrap'
import Img from "gatsby-image"
import Tool from "../tool"

export default ({ project }) => {
  const toolset = project.frontmatter.toolset
  return (
    <Card border="secondary" className="shadow h-100">
      {project.frontmatter.image &&
        <a href={project.frontmatter.link} rel="noopener noreferrer" target="_blank">
          <Img className="card-img-top" fluid={project.frontmatter.image.childImageSharp.fluid} />
        </a>
      }
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3">{project.frontmatter.title}</Card.Title>
        <Card.Text dangerouslySetInnerHTML={{ __html: project.html }} className="flex-grow-1" />
        <ul className="list-inline">
          {toolset && Object.keys(toolset).map((key, index) => (
            toolset[key] &&
            <li className="list-inline-item" key={index}>
              <Tool tool={key} size="32" width="2em" />
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export const query = graphql`
  fragment ProjectFragment on MarkdownRemark {
    excerpt(pruneLength: 400)
    html
    id
    frontmatter {
      title
      archive
      websites {
        link
        image {
          childImageSharp {
            fluid(maxWidth: 1024, maxHeight: 576, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      toolset {
        react
        angular
        bootstrap
        django
        gulp
        wordpress
        gatsby
        webpack
        jquery
        aws
        sass
      }
      started(formatString: "MMMM YYYY")
      ended(formatString: "MMMM YYYY")
    }
  }
`