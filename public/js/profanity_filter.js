//profanity filter check utilized in creation of post and comments, updating post and comments, and description/bio of user -arevalo

function word_filter(post){
    const curse_words = ["ass", "asshole", "bitch", "bullshit", "cock", "cunt", 
    "cocksucker", "dick", "dickhead", "fuck", "horseshit", "motherfucker", "nigga", 
    "pussy", "shit", "slut", "whore", "wanker", "bobo", "puta", "tangina", "gago"];

    const pattern = new RegExp(curse_words.join("|"), "gi");

    const censored_words = post.replace(pattern, function(match){
        return "*".repeat(match.length);
    })
    
    return censored_words;
}