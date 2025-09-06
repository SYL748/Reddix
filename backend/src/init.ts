import mongoose, { Types } from "mongoose"
import User from "./model/User"
import Post from "./model/Post"
import Comment from "./model/Comment"
import Community from "./model/Community"
import LinkFlair from "./model/LinkFlair"

const init = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/reddit_clone")
        await Promise.all([
            User.deleteMany({}),
            LinkFlair.deleteMany({}),
            Post.deleteMany({}),
            Comment.deleteMany({}),
            Community.deleteMany({}),
        ])
        const john = await User.create({
            firstName: "John",
            lastName: "Napkin",
            email: "test@test.com",
            password: "111111",
            displayName: "John"
        })
        const mary = await User.create({
            firstName: "Mary",
            lastName: "Yu",
            email: "test1@test.com",
            password: "111111",
            displayName: "Mary"
        })
        const linkFlair1 = await LinkFlair.create({
            content: "Funny"
        })
        const linkFlair2 = await LinkFlair.create({
            content: "LMAO"
        })
        const linkFlair3 = await LinkFlair.create({
            content: "Scary"
        })
        const community1 = await Community.create({
            name: "Community1",
            description: "all funny jokes here",
            creator: "John",
            member: ["John", "Mary"]
        })
        const community2 = await Community.create({
            name: "Community2",
            description: "Spooky stuff",
            creator: "Mary",
            member: ["Mary"]
        })
        const post1 = await Post.create({
            title: "Post1",
            content: `A panda walks into a bar. He orders a simple meal. 
            After finishing it, he takes out a shotgun and fires it at the roof. 
            The bartender asks, 'What the hell are you doing?!' 
            The panda, walking out, says, 'I'm a panda. Look me up.' 
            Later, the bartender looks it up, and the definition says, Eats shoots and leaves.`,
            linkFlairID: linkFlair1._id,
            postedBy: "John"
        })
        const post2 = await Post.create({
            title: "Post2",
            content: `'If there are any idiots in the room, will they please stand up', said the sarcastic teacher.
            After a long silence, one freshman rose to his feet.
            'Now then mister, why do you consider yourself an idiot?', inquired the teacher with a sneer.
            'Well, actually I don't,' said the student, 'but I hate to see you standing up there all by yourself.'`,
            linkFlairID: linkFlair2._id,
            postedBy: "Mary"
        })
        const post3 = await Post.create({
            title: "Post3",
            content: `A daughter was in her room upstairs, doing her homework, 
            when suddenly she heard her mother call to come down for dinner. 
            She jumped onto her feet and began making her way towards the stairs, 
            but before even took a step, hands grabbed her and pulled her into the laundry room besides the staircase. 
            She panicked before realizing it was her mother, her real mother, eyes watery and bloodshot. 
            'Don't go down there honey, I heard it too.'`,
            linkFlairID: linkFlair3._id,
            postedBy: "Mary"
        })


        const comment1 = await Comment.create({
            content: "Comment1",
            commentedBy: "Mary"
        })
        const comment2 = await Comment.create({
            content: "Comment2",
            commentedBy: "John"
        })
        const comment3 = await Comment.create({
            content: "Comment3",
            commentedBy: "Mary"
        })
        const comment4 = await Comment.create({
            content: "Comment4",
            commentedBy: "John"
        })
        const comment5 = await Comment.create({
            content: "Comment5",
            commentedBy: "John"
        })
        john.communityIDs.push(community1._id as Types.ObjectId)
        mary.communityIDs.push(community2._id as Types.ObjectId)
        john.postIDs.push(post1._id as Types.ObjectId)
        mary.postIDs.push(post2._id as Types.ObjectId, post3._id as Types.ObjectId)
        john.commentIDs.push(comment2._id as Types.ObjectId, comment4._id as Types.ObjectId, comment5._id as Types.ObjectId)
        mary.commentIDs.push(comment1._id as Types.ObjectId, comment3._id as Types.ObjectId)

        community1.postId.push(post1._id as Types.ObjectId, post2._id as Types.ObjectId)
        community2.postId.push(post3._id as Types.ObjectId)

        post1.commentIDs.push(comment1._id as Types.ObjectId, comment2._id as Types.ObjectId)
        post2.commentIDs.push(comment4._id as Types.ObjectId)
        post3.commentIDs.push(comment5._id as Types.ObjectId)

        comment2.commentIDs.push(comment3._id as Types.ObjectId)
        await Promise.all([
            john.save(),
            mary.save(),
            community1.save(),
            community2.save(),
            post1.save(),
            post2.save(),
            post3.save(),
            comment2.save(),
        ])

    } catch (err) {
        console.error("Error initializing database:", err);
        process.exit(1);
    }
}

init()