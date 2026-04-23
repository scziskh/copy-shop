import SingleCloseButton from "@/form/singleCloseButton";
import useCalculator from "@/hooks/useCalculator";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const SingleProduct = ({ product, handler }) => {
  const price = useCalculator(product.name, product.params);
  const t = useTranslations("Calculator");
  const tProduct = useTranslations("Products");
  const formatter = new Intl.NumberFormat("ru");

  return (
    <Wrapper>
      <div>
        <ProductName>{tProduct(`${product.name}.name`)}</ProductName>
        <ul>
          {Object.entries(product.params).map(([name, value]) => {
            if (name !== "file") {
              if (typeof value === "object") {
                return (
                  <div key={name}>
                    <li>{t(`${name}.header`)}</li>
                    <ul>
                      {value?.PAPER !== "NO_PAPER" ? (
                        Object.entries(value).map(([childName, value]) =>
                          childName === "PAGES" ? (
                            <li key={`${name}.${childName}`}>{`${t(
                              `${name}.${childName}.header`
                            )} ${value}`}</li>
                          ) : (
                            name !== "STICKER_SIZE" && (
                              <li key={`${name}.${childName}`}>{`${t(
                                `${name}.${childName}.header`
                              )} ${t(`${name}.${childName}.${value}`)}`}</li>
                            )
                          )
                        )
                      ) : (
                        <li>{t(`COVER.PAPER.NO_PAPER`)}</li>
                      )}
                    </ul>
                  </div>
                );
              }

              return name === "COUNT" ||
                name === "WIDTH" ||
                name === "HEIGHT" ||
                name === "GRAYSCALE_PAGES" ||
                name === "COLOR_PAGES" ? (
                <li key={`${name}`}>{`${t(`${name}.header`)} ${value}`}</li>
              ) : (
                name !== "STICKER_SIZE" && (
                  <li key={`${name}`}>{`${t(`${name}.header`)} ${t(
                    `${name}.${value}`
                  )}`}</li>
                )
              );
            }
          })}
        </ul>
      </div>
      <File>
        {product.filePath && (
          <a href={product.filePath} target="_blank">
            Файл
          </a>
        )}
      </File>
      <div>
        <span>
          <strong>{formatter.format(price)}₴</strong>
        </span>
      </div>
      <SingleCloseButton handler={handler} />
    </Wrapper>
  );
};
export default SingleProduct;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  background: var(--mainBackground);
  box-shadow: var(--boxShadow);
  gap: 24px;
  align-items: center;
  padding: 48px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
  ul {
    margin-left: 24px;
  }
`;

const ProductName = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 12px;
  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }
`;

const File = styled.div`
  a {
    font-weight: 600;
    font-size: 20px;
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }
`;
