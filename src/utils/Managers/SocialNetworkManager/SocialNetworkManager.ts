import SocialNetworks from "../../Enums/SocialNetworks";
import {ShareManager} from "../../Services/ShareManager/ShareManager";

class SocialNetworkManager {
    constructor(researchId: string, researchTitle: string) {
        this.url = ShareManager.shareResearch(researchId);
        this.researchId = researchId;
        this.researchTitle = researchTitle;
    }


    private researchId: string;
    private researchTitle: string;
    private url: string;
    public getShareLink(socialNetwork: SocialNetworks) {
        switch (socialNetwork) {
            case SocialNetworks.FACEBOOK:
                return `https://www.facebook.com/sharer/sharer.php?u=${this.url}`;
            case SocialNetworks.LINKEDIN:
                return `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}`;
            case SocialNetworks.REDDIT:
                return `https://reddit.com/submit?url=${this.url}&title=${this.researchTitle}`;
            case SocialNetworks.TELEGRAM:
                return `https://telegram.me/share/url?url=${this.url}>&text=${this.researchTitle}`;
            case SocialNetworks.TWITTER:
                return `https://twitter.com/intent/tweet?url=${this.url}&text=${this.researchTitle}`;
            case SocialNetworks.WHATSAPP:
                return `whatsapp://send?text=Check my new research => ${this.researchTitle} - Link: ${this.url}`;
            default: throw Error("Invalid Social Network!!");
        }
    }
}

export default SocialNetworkManager;
