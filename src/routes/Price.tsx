import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ITickersData as IPriceData } from "./Coin";

const ani_keyframe = keyframes`
    0% {
        transform: translateX(-800px);
    }
    100% {
        transform: translateX(0);
    }
`;

interface PriceProps {
    coinId: string | undefined;
    priceData?: IPriceData;
}

const Overview = styled.ul`

`;

const ItemTitle = styled.strong`
    color: ${props => props.theme.accentColor};
    font-size: 13px;
    font-weight: 700;
    position :absolute;
    left: 20px;
`

const OverviewItem = styled.li`
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 15px 20px;
    animation: ${ani_keyframe} 1s ease forwards;
    transform: translateX(-800px);
    text-align: right;
    position: relative;

    &:nth-child(2) {
        animation-delay: 1s;
    }

    &:nth-child(3) {
        animation-delay: 2s;
    }

    &:nth-child(4) {
        animation-delay: 3s;
    }

    &:nth-child(5) {
        animation-delay: 4s;
    }

    &:nth-child(6) {
        animation-delay: 5s;
    }
`

function Price({coinId , priceData }: PriceProps) {

    const [ data , setData ] = useState<IPriceData>();
    const [ loading, setLoading ] = useState<boolean>(true);
    
    useEffect(()=>{
        setData(priceData);
        setLoading(false);
    },[]);

    return <div>
        {
            loading? "Loading ..." : (
                <Overview>
                    <OverviewItem><ItemTitle>USD Coin Price</ItemTitle>$ {data?.quotes.USD.price.toFixed(3)}</OverviewItem>
                    <OverviewItem><ItemTitle>percent_change_1h</ItemTitle>$ {data?.quotes.USD.percent_change_1h.toFixed(3)}</OverviewItem>
                    <OverviewItem><ItemTitle>percent_change_12h</ItemTitle>$ {data?.quotes.USD.percent_change_12h.toFixed(3)}</OverviewItem>
                    <OverviewItem><ItemTitle>percent_change_24h</ItemTitle>$ {data?.quotes.USD.percent_change_24h.toFixed(3)}</OverviewItem>
                    <OverviewItem><ItemTitle>percent_change_30d</ItemTitle>$ {data?.quotes.USD.percent_change_30d.toFixed(3)}</OverviewItem>
                    <OverviewItem><ItemTitle>percent_change_1y</ItemTitle>$ {data?.quotes.USD.percent_change_1y.toFixed(3)}</OverviewItem>
                </Overview>
            )
        }; 
    </div>
}

export default Price;