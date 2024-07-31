"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const skillProficiencies: Skills = {
  STRENGTH: ["Athletics"],
  DEXTERITY: ["Acrobatics", "Slight of Hand", "Stealth"],
  INTELLIGENCE: ["Arcana", "History", "Investigation", "Nature", "Religion"],
  WISDOM: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
  CHARISMA: ["Deception", " Intimidation", "Performance", "Persuasion"],
};

type Skills = {
  [key in S]: string[];
};

enum S {
  STRENGTH = "STRENGTH",
  DEXTERITY = "DEXTERITY",
  INTELLIGENCE = "INTELLIGENCE",
  WISDOM = "WISDOM",
  CHARISMA = "CHARISMA",
}

const SkillProficiencies = () => {
  return (
    <>
      <Box
        width={250}
        height={550}
        border={1}
        borderColor="purple"
        margin={2}
        bgcolor="#9A9696"
        borderRadius={4}
      >
        <Stack m={1}>
          <Typography fontWeight={700} textAlign="center">
            SKILLS
          </Typography>
          <Stack>
            {Object.keys(skillProficiencies).map((abilityScore) => {
              return (
                <Stack key={abilityScore}>
                  <Typography fontSize={14} fontWeight={600}>
                    {abilityScore}
                  </Typography>
                  {skillProficiencies[abilityScore as keyof typeof S].map(
                    (skill) => (
                      <Stack
                        key={skill}
                        direction="row"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Stack
                          direction="row"
                          ml={3}
                          display="flex"
                          alignItems="center"
                        >
                          {Math.random() < 0.2 ? (
                            <FiberManualRecordIcon
                              fontSize="small"
                              sx={{
                                fontSize: 11,
                                verticalAlign: "middle",
                              }}
                            />
                          ) : (
                            <FiberManualRecordOutlinedIcon
                              fontSize="small"
                              sx={{
                                fontSize: 11,
                                verticalAlign: "middle",
                              }}
                            />
                          )}
                          {
                            <FiberManualRecordOutlinedIcon
                              fontSize="small"
                              sx={{
                                fontSize: 11,
                                mr: 1,
                                verticalAlign: "middle",
                              }}
                            />
                          }
                          <Typography fontSize={14}>{skill}</Typography>
                        </Stack>
                        <Box
                          width={30}
                          height={20}
                          border={1}
                          bgcolor="white"
                          borderRadius={1}
                        >
                          <Typography textAlign="center" fontSize={12}>
                            +1
                          </Typography>
                        </Box>
                      </Stack>
                    )
                  )}
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SkillProficiencies;
