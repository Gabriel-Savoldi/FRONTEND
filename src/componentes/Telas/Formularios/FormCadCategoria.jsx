import { useState } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel, Spinner } from 'react-bootstrap';

export default function FormCadCategorias(props) {
    return (
        <Container>
            <Form noValidate>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Categoria:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição da categoria"
                                    id="descricao"
                                    name="descricao"
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

}