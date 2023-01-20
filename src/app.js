const mongoose = require("mongoose");
const validator = require("email-validator");

mongoose.set("strictQuery", false);
//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/aryan")
    .then(() => { console.log("connected!") })
    .catch((err) => { console.log(err) });



//creating schema/structure
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [5, "minimum allowed length is 5 character"],
        maxlength: 20
    },
    rollno: {
        type: Number,
        required: [true, "enter your number its require !."],
        // enum: [1129, 2340, 1111] if user not enter rollno 1129,2340,1111 then it will throw error
        validate(value) {
            if (value < 0) {
                throw new Error("Number is positive only");
            }
        }
    },
    college: {
        type: String,
        uppercase: true,
        trim: true
    },
    active: Boolean,

    email:
    {
        type: String,
        require: true,
        unique: true,
        validate(value) {
            if (!validator.validate(value)) {
                throw new Error("Not A valid email")
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//creating collections
const Data = new mongoose.model("Data", dataSchema);







//inserting Data
const insertData = async () => {
    try {
        const datax = new Data({
            name: " VaNShiKa   ",
            rollno: 1439,
            college: "  nAV gUjArAt ",
            active: false,
            email: "aryannayak1509@gmail.com"
        })

        const result = await Data.insertMany([datax]);
        // datax.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
insertData();







//read data
const getDocument = async () => {
    try {
        // return value where rollno is graterthan 1125 and $gte for grater than equalto
        // const readData = await Data
        //     .find({ rollno: { $gt: 1125 } })
        //     .select({ college: 0, _id: 0, date: 0 });
        // console.log(readData);

        // return value where rollno is lessthan 1125 and $lte for less than equalto
        // const readData = await Data
        //     .find({ rollno: { $lte: 1125 } })
        //     .select({ college: 0, _id: 0, date: 0 });
        // console.log(readData);



        //  find({college:"GU"}).skip(1) return document of GU college but first one skip
        //  find({college:"GU"}).select({active:0,_id:0,__v:0}) return document of GU college but active,_id,__v is hidden.



        // .find({ college: { $in: ["GU", "HL",,"CUshah"] } }) return document which is "in"(included) college "GU","HL","CUshah"
        // .find({ college: { $nin: ["GU", "HL",,"CUshah"] } }) return document which is "nin"(notincluded) college "GU","HL","CUshah"
        // const readData = await Data
        //     .find({ college: { $in: ["GU", "HL", "CUshah"] } })
        //     .select({ _id: 0, date: 0, __v: 0 })

        // .find({ $or: [ {college:"GU"},{rollno:{$lte:1126}},{active:true} ] }) return document of "college is GU" or "rollno lessthanequalto 1126" or "active is true" :: if document has atleast match value of above [array];  then its retunable


        // $nor return opposite of $or output


        // .find({ $and: [{college:"GU"},{rollno:{$lte:1126}},{active:true}] }) return document of "college is GU" and "rollno lessthanequalto 1126" and "active is true" :: if document has all the value is match of above [array] then its returnable
        // const readData = await Data
        //     .find(
        //         {
        //             $nor:
        //                 [
        //                     { college: "GU" },
        //                     { rollno: { $lte: 1126 } },
        //                     { active: true }
        //                 ]
        //         }
        //     )
        //     .select({ _id: 0, date: 0, __v: 0 })
        // console.log(readData);




        // .find({ rollno: { $gte: 1123 } }).count() return the number of document which has rollno graterthanequalto 1123
        // .find({ rollno: { $gte: 1123 } }).sort({name: 1}) return the document increasing order By name
        // .find({ rollno: { $gte: 1123 } }).sort({name: -1}) return the document deccreasing order By name
        // const readData = await Data
        //     .find({ rollno: { $gte: 1123 } })
        //     .select({ _id: 0, __v: 0, date: 0 })
        //     .sort({ name: 1 })
        // console.log(readData);

    } catch (error) {
        console.log(error)
    }
}
// getDocument();







//update Data
// .updateOne(...) return the modified data count.
// .findByIdAndUpdate(...) return the modified object previous data the.
// .findByIdAndUpdate({field},{updatedValue},{new:true}) [new:true] return the modified object with current data.

// const updateDocument = async (_id) => {
//     try {
//         const updatedData = await Data.findByIdAndUpdate({ _id }, {
//             $set: {
//                 college: "GU"
//             }
//         },{
//             // new : true Means The Updated Object will by return and we console that.
//             new:true
//         });

//         console.log(updatedData);

//     } catch (error) {
//         console.log(error);
//     }
// }
// updateDocument("63b6c141f4e8e2345897c7f7");








//delete the document
// .deleteOne({}) delete the object and return count
// .deleteOne({}) delete the object and return count


const deleteDocument = async (_id) => {
    try {
        const deleteData = await Data.findByIdAndDelete({ _id })
        console.log(deleteData);
    } catch (error) {
        console.log(error);
    }
}

// deleteDocument("63b6c1c38368a2a7fc63a49e");