import { Card, Flex, Heading, Stack, Text, Grid, Button } from '@sanity/ui';
import { HomeIcon, CogIcon, StarIcon, UsersIcon, LaunchIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

interface ContentSection {
  title: string;
  type: string;
  icon: ComponentType;
  description: string;
}

const SECTIONS: ContentSection[] = [
  {
    title: 'Proyectos',
    type: 'project',
    icon: HomeIcon,
    description: 'Portafolio de proyectos completados',
  },
  {
    title: 'Servicios',
    type: 'service',
    icon: CogIcon,
    description: 'Servicios ofrecidos por la empresa',
  },
  {
    title: 'Certificaciones',
    type: 'certification',
    icon: StarIcon,
    description: 'Certificaciones y acreditaciones',
  },
  {
    title: 'Testimonios',
    type: 'testimonial',
    icon: UsersIcon,
    description: 'Testimonios de clientes',
  },
];

function useDocumentCounts() {
  const client = useClient({ apiVersion: '2025-03-14' });
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const query = `{
      "project": count(*[_type == "project"]),
      "service": count(*[_type == "service"]),
      "certification": count(*[_type == "certification"]),
      "testimonial": count(*[_type == "testimonial"])
    }`;

    client.fetch(query).then(setCounts);
  }, [client]);

  return counts;
}

export default function StudioHome() {
  const counts = useDocumentCounts();

  return (
    <Card padding={5} sizing="border" style={{ minHeight: '100%' }}>
      <Stack space={6}>
        {/* Header */}
        <Flex align="center" gap={3}>
          <img
            src="/ms-logo.svg"
            alt="MasterSpace"
            style={{ height: 36, width: 'auto' }}
          />
          <Stack space={2}>
            <Heading size={3}>MasterSpace CMS</Heading>
            <Text size={1} muted>
              Administra el contenido del sitio web
            </Text>
          </Stack>
        </Flex>

        {/* Content cards */}
        <Grid columns={[1, 1, 2]} gap={4}>
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const count = counts[section.type];

            return (
              <Card
                key={section.type}
                padding={4}
                radius={3}
                shadow={1}
                tone="default"
              >
                <Stack space={4}>
                  <Flex align="center" gap={3}>
                    <Text size={3}>
                      <Icon />
                    </Text>
                    <Stack space={2}>
                      <Heading size={1}>{section.title}</Heading>
                      <Text size={1} muted>
                        {section.description}
                      </Text>
                    </Stack>
                  </Flex>
                  <Flex align="center" justify="space-between">
                    <Text size={1} muted>
                      {count !== undefined ? `${count} documento${count !== 1 ? 's' : ''}` : '…'}
                    </Text>
                  </Flex>
                </Stack>
              </Card>
            );
          })}
        </Grid>

        {/* Quick link */}
        <Card padding={4} radius={3} tone="primary" border>
          <Flex align="center" justify="space-between">
            <Stack space={2}>
              <Text size={1} weight="semibold">
                Ver sitio web
              </Text>
              <Text size={1} muted>
                Abre el sitio en una nueva pestaña
              </Text>
            </Stack>
            <Button
              as="a"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              icon={LaunchIcon}
              text="Abrir"
              tone="primary"
              mode="ghost"
            />
          </Flex>
        </Card>
      </Stack>
    </Card>
  );
}
