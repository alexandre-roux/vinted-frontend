const Offer = ({ offer }) => {
  return (
    <div className="offer">
      <div className="seller-details">
        <img
          className="seller-image"
          src={offer.owner.account.avatar.url}
          alt="seller image"
        />
        <span className="seller-name">{offer.owner.account.username}</span>
      </div>
      <img
        className="product-image"
        src={offer.product_image.url}
        alt="product image"
      />
      <div className="product-details">
        <span className="price">{offer.product_price} €</span>
        <span className="size-brand">{offer.product_details[1].TAILLE}</span>
        <span className="size-brand">{offer.product_details[0].MARQUE}</span>
      </div>
    </div>
  );
};

export default Offer;
