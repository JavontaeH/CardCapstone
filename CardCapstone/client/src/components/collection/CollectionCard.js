export const CollectionCard = ({ card }) => {
  console.log(card);
  return (
    <div className="collection-card-wrapper">
      <h1>{card?.name}</h1>
      <h3>{card?.description}</h3>
      <h5>{card?.atk}</h5>
      <h5>{card?.hp}</h5>
      <h5>{card?.mana}</h5>
      {/* <img src={card?.imageLocation} alt="card-image" /> */}
    </div>
  );
};
