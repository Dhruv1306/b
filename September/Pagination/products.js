// used to generate data. It can generate object. through Array constructor
module.exports = Array.from({length:100}, (_,i)=>(
    {
        id:i + 1,
        name: `Item_${i + 1}`,
    }
))