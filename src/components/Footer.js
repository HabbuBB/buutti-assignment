import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'

export default function Footer() {
  return (
    <Row className="footer">
        <Col>
            <p className="text-muted">Aleksi Hannula</p>
        </Col>
        <Col>
            <p className="text-muted text-end">5.12.2022</p>
        </Col>
    </Row>
  )
}
