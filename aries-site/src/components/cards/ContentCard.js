import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Image, Text } from 'grommet';
import { Identifier, Tile } from 'aries-core';
import { PreviewImageCard } from './PreviewCard';
import { useDarkMode } from '../../utils';

const StyledTile = styled(Tile)`
  transition: all 0.3s ease-in-out;
  :focus,
  :hover {
    transform: scale(1.01, 1.01);
  }
`;

export const ContentCard = forwardRef(({ topic, ...rest }, ref) => {
  const { description, name, parent, preview } = topic;
  const [isFocused, setIsFocused] = React.useState(false);
  const darkMode = useDarkMode();
  return (
    <StyledTile
      align="start"
      background="background-front"
      elevation={isFocused ? 'medium' : 'small'}
      fill
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      pad="large"
      ref={ref}
      {...rest}
    >
      <Box gap="large">
        <PreviewImageCard background={preview && preview.background}>
          {preview &&
            (preview.image && preview.image.src ? (
              <Image
                src={
                  darkMode.value
                    ? preview.image.src.dark || preview.image.src
                    : preview.image.src.light || preview.image.src
                }
                alt={preview.image.alt}
                fit={preview.image.fit || 'cover'}
              />
            ) : (
              preview.component && (
                <Box
                  style={{ pointerEvents: 'none' }}
                  flex
                  justify={preview.justify || 'center'}
                  align="center"
                >
                  {preview.component()}
                </Box>
              )
            ))}
        </PreviewImageCard>
        <Box gap="small">
          <Identifier title={name} align="start" gap="xsmall" size="xxlarge">
            {parent && parent.icon && (
              <Box direction="row" align="center" gap="xsmall">
                {parent.icon('small', parent.color)}
                <Text>{parent.name}</Text>
              </Box>
            )}
          </Identifier>
          <Text size="small">{description}</Text>
        </Box>
      </Box>
    </StyledTile>
  );
});

ContentCard.propTypes = {
  topic: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      color: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
    }),
    preview: PropTypes.shape({
      background: PropTypes.string,
      justify: PropTypes.string,
      component: PropTypes.func,
      image: PropTypes.shape({
        alt: PropTypes.string,
        fit: PropTypes.string,
        src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      }),
    }),
  }),
};
