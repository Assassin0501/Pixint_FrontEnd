import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '8nezgt0f',
    dataset:'production',
    apiVersion:'2022-12-28',
    useCdn:true,
    token:'skZGDc3083fF2aBbSEvHd2wyt151DGedvvhD74OTJwsBmGuUWfPCRe0wkT0bCmJKYrYOf1Vf3jz72yXGHpVgb3yMDeoCQTFDpRfG7qDLi92suQYEPshOITYVCTzjDIUiAwJrlDRnBAOwrbKPkWhWztAWM5jImZVpQhLPW82GNyyTbewmMaN5',
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);