//import Card from 'react-bootstrap/Card';

function Home() {

    return (
        <div className="card bg-dark text-white">
            {/* Image used as background */}
            <img src="/src/assets/images/bgimage.jpg" className="card-img" alt="Background" style={{ objectFit: "cover", height: "100vh" }} />
            {/* Text overlay */}
            <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="card-title fw-bold display-4">Welcome to Kalamkari</h1>
                <p className="card-text fs-5">
                    Discover handcrafted elegance woven into every piece. Experience timeless artistry.
                </p>
            </div>
        </div>
        //<Card style={{ width: "80%" }}>
        //    <Card.Img variant="top" src="/src/assets/images/bgimage.jpg" />
        //    <Card.Body>
        //        <Card.Title>Kalamkari</Card.Title>
        //        <Card.Text>
        //            Some quick example text to build on the card title and make up the
        //            bulk of the card's content.
        //        </Card.Text>
        //    </Card.Body>
        //</Card>
    )
    //<Image src="/src/assets/images/bgimage.jpg" className="ms-5" height="50%" fluid />;
}

export default Home;